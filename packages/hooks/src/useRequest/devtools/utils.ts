class HashTable {
  private table: { [key: string]: boolean } = {};
  private hashTable: { [key: symbol]: string } = {};

  // 插入字符串
  insert(str: string): symbol {
    const symbolCode = Symbol(str)
    this.table[str] = true;
    this.hashTable[symbolCode] = str;
    return symbolCode;
  }

  // 使用哈希码查找字符串
  find(symbolCode: symbol): string | undefined {
    return this.hashTable[symbolCode];
  }
}

export const HashTableInstance = new HashTable()


export function getFunctionName(func: string) {
  const funcString = func.toString();
  const match = funcString.match(/^function\s+([^\s(]+)/);
  return match ? match[1] : '';
}

export function getArrowFunctionName(func: string) {
  const funcString = func.toString();
  const regex = /([a-zA-Z$_][a-zA-Z0-9$_]*)\s*\(/;
  const match = funcString.match(regex);
  return match ? match[1].trim() : '';
}

export function getRequestTagBg(type: string) {
  if (type === 'pending') return 0xFF8C00
  if (type === 'done') return 0x42b883
  if (type === 'error') return 0xFF3300
  if (type === 'mutate') return 0x006bff

  return 0x4a5cb6
}

