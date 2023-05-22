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
    description: "VueHooks Plus's Author",
    packages: ['vue-hooks-plus'],
  },
  {
    avatar: contributorsAvatars.hongaah,
    name: 'Hongaah',
    github: 'hongaah',
    description: '',
    functions: ['useSetState', 'useWebSocket'],
  },
  {
    avatar: contributorsAvatars.Noobbbbbbb,
    name: 'Noobbbbbbb',
    github: 'Noobbbbbbb',
    description: '',
    functions: ['useFullscreen'],
  },
]
// .sort(
//   (pre, cur) =>
//     contributors.findIndex(name => name === pre.github) -
//     contributors.findIndex(name => name === cur.github),
// )

export { coreTeamMembers, contributorList as contributors }
