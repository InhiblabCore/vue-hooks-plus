import contributors from './contributors.json'

export interface Contributor {
  name: string
  avatar: string
}

export interface CoreTeam {
  avatar: string
  name: string
  github: string
  twitter?: string
  sponsors?: boolean
  description: string
  packages?: string[]
  functions?: string[]
}

const contributorsAvatars: Record<string, string> = {}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

const contributorList = (contributors as string[]).reduce((acc, name) => {
  contributorsAvatars[name] = getAvatarUrl(name)
  acc.push({ name, avatar: contributorsAvatars[name] })
  return acc
}, [] as Contributor[])

const coreTeamMembers: CoreTeam[] = [
  {
    avatar: contributorsAvatars.NelsonYong,
    name: 'Yong Git',
    github: 'NelsonYong',
    twitter: 'Yong_Git',
    sponsors: true,
    description: 'vue-hooks-plus 作者',
    packages: ['vue-hooks-plus'],
  },
  {
    avatar: contributorsAvatars.hongaah,
    name: 'Hongaah',
    github: 'hongaah',
    description: '技术达人',
    packages: ['vue-hooks-plus 构建方案'],
  },
].sort(
  (pre, cur) =>
    contributors.findIndex(name => name === pre.github) -
    contributors.findIndex(name => name === cur.github),
)

export { coreTeamMembers, contributorList as contributors }
