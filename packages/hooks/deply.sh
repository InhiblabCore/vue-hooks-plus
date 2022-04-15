#!/usr/bin/env sh
 
# 当发生错误时中止脚本
set -e
 
pnpm run build
pnpm run build:types