/* ---------------------------------------------------------------------------------------------
  *  Copyright (c) Microsoft Corporation. All rights reserved.
  *  Licensed under the MIT License. See License.txt in the project root for license information.
  *-------------------------------------------------------------------------------------------- */

import * as htmlService from 'vscode-html-languageservice'
import { worker } from './fillers/monaco-editor-core'
import type { Options } from './monaco.contribution'
import { htmlCompletionPlugins } from '../../plugins/index'

export interface ICreateData {
  languageId: string
  languageSettings: Options
}

export class HTMLWorker {
  private _ctx: worker.IWorkerContext
  private _languageService: htmlService.LanguageService
  private _languageSettings: Options
  private _languageId: string

  constructor(ctx: worker.IWorkerContext, createData: ICreateData) {
    this._ctx = ctx
    this._languageSettings = createData.languageSettings
    this._languageId = createData.languageId
    this._languageService = htmlService.getLanguageService()
  }

  async doValidation(): Promise<htmlService.Diagnostic[]> {
    // not yet suported
    return Promise.resolve([])
  }

  async doComplete(
    uri: string,
    position: htmlService.Position,
  ): Promise<htmlService.CompletionList> {
    const document = this._getTextDocument(uri)
    const htmlDocument = this._languageService.parseHTMLDocument(document)
    const items = htmlCompletionPlugins.map(plugin => plugin.completions({ document, html: htmlDocument, position })).flat()
    const completions = this._languageService.doComplete(
      document,
      position,
      htmlDocument,
      this._languageSettings && this._languageSettings.suggest,
    )

    return Promise.resolve({
      isIncomplete: true,
      items: [
        ...completions.items,
        ...items,
      ],
    })
  }

  async format(
    uri: string,
    range: htmlService.Range,
    options: htmlService.FormattingOptions,
  ): Promise<htmlService.TextEdit[]> {
    const document = this._getTextDocument(uri)
    const formattingOptions = { ...this._languageSettings.format, ...options }
    const textEdits = this._languageService.format(document, range, formattingOptions)
    return Promise.resolve(textEdits)
  }

  async doHover(uri: string, position: htmlService.Position): Promise<htmlService.Hover> {
    const document = this._getTextDocument(uri)
    const htmlDocument = this._languageService.parseHTMLDocument(document)
    const hover = this._languageService.doHover(document, position, htmlDocument)
    return Promise.resolve(hover!)
  }

  async findDocumentHighlights(
    uri: string,
    position: htmlService.Position,
  ): Promise<htmlService.DocumentHighlight[]> {
    const document = this._getTextDocument(uri)
    const htmlDocument = this._languageService.parseHTMLDocument(document)
    const highlights = this._languageService.findDocumentHighlights(document, position, htmlDocument)
    return Promise.resolve(highlights)
  }

  async findDocumentLinks(uri: string): Promise<htmlService.DocumentLink[]> {
    const document = this._getTextDocument(uri)
    const links = this._languageService.findDocumentLinks(document, null!)
    return Promise.resolve(links)
  }

  async findDocumentSymbols(uri: string): Promise<htmlService.SymbolInformation[]> {
    const document = this._getTextDocument(uri)
    const htmlDocument = this._languageService.parseHTMLDocument(document)
    const symbols = this._languageService.findDocumentSymbols(document, htmlDocument)
    return Promise.resolve(symbols)
  }

  async getFoldingRanges(
    uri: string,
    context?: { rangeLimit?: number },
  ): Promise<htmlService.FoldingRange[]> {
    const document = this._getTextDocument(uri)
    const ranges = this._languageService.getFoldingRanges(document, context)
    return Promise.resolve(ranges)
  }

  async getSelectionRanges(
    uri: string,
    positions: htmlService.Position[],
  ): Promise<htmlService.SelectionRange[]> {
    const document = this._getTextDocument(uri)
    const ranges = this._languageService.getSelectionRanges(document, positions)
    return Promise.resolve(ranges)
  }

  async doRename(
    uri: string,
    position: htmlService.Position,
    newName: string,
  ): Promise<htmlService.WorkspaceEdit> {
    const document = this._getTextDocument(uri)
    const htmlDocument = this._languageService.parseHTMLDocument(document)
    const renames = this._languageService.doRename(document, position, newName, htmlDocument)
    return Promise.resolve(renames!)
  }

  private _getTextDocument(uri: string): htmlService.TextDocument {
    const models = this._ctx.getMirrorModels()
    for (const model of models) {
      if (model.uri.toString() === uri) {
        return htmlService.TextDocument.create(
          uri,
          this._languageId,
          model.version,
          model.getValue(),
        )
      }
    }
    return null!
  }
}

export function create(ctx: worker.IWorkerContext, createData: ICreateData): HTMLWorker {
  return new HTMLWorker(ctx, createData)
}
