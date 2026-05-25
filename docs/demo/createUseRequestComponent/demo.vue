<template>
  <UseRequest :service="getUser" :refresh-deps="[userId]">
    <template #loading>
      <p>Loading user...</p>
    </template>
    <template #error="{ error }">
      <p>{{ error?.message }}</p>
    </template>
    <template #default="{ data, refresh }">
      <p>{{ data?.name }} · {{ data?.role }}</p>
      <vhp-button type="vhp-button" style="margin-right: 12px" @click="nextUser">
        next user
      </vhp-button>
      <vhp-button type="vhp-button" @click="refresh">
        refresh
      </vhp-button>
    </template>
  </UseRequest>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { createUseRequestComponent } from 'vue-hooks-plus'

type User = {
  name: string
  role: string
}

const UseRequest = createUseRequestComponent<User, []>()
const userId = ref(1)

const getUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return {
    name: `User ${userId.value}`,
    role: userId.value % 2 ? 'Owner' : 'Member',
  }
}

const nextUser = () => {
  userId.value += 1
}
</script>
