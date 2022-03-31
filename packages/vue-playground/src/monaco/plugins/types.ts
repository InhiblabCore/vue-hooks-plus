import type { CompletionItem, TextDocument, HTMLDocument, Position } from 'vscode-html-languageservice'
import type { editor as Editor } from 'monaco-editor'

export interface HTMLPluginCompletion {
  position: Position
  document: TextDocument
  html: HTMLDocument
}

export interface HTMLPlugin {
  completions(options: HTMLPluginCompletion): CompletionItem[]
}

export interface EditorPlugin {
  language: string
  onContentChanged: (editor: Editor.IStandaloneCodeEditor) => void
  [key: string]: any
}
