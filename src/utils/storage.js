﻿import storage from 'good-storage' // 存储库，实现sessionStorage和localStorage功能

const SELLER_KEY = '__seller__'

export function saveToLocal(id, key, val) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  storage.set(SELLER_KEY, seller)
}

export function loadFromLocal(id, key, def) {
  const seller = storage.get(SELLER_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
