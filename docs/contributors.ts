
type Contributors = {
  name: string
  avatar?: string
  title: "Creator" | "Core developer" | "Contributor",
  desc?: string
  org?: string
  orgLink?: string
  links: {
    icon: "github" | "twitter" | "discord",
    link: string
  }[]
}
export const members: Contributors[] = [
  {
    avatar: "https://github.com/NelsonYong.png",
    name: 'YongGit',
    title: 'Creator',
    desc: "VueHooks Plus's Author",
    org: 'InhiblabCore',
    orgLink: "https://github.com/InhiblabCore",
    links: [
      { icon: 'github', link: 'https://github.com/NelsonYong' },
      { icon: 'twitter', link: 'https://x.com/Yong_Git' },
      {
        icon: "discord",
        link: "https://discord.com/invite/z5Ve5r9Kwp"
      }
    ]
  }, {
    avatar: 'https://www.github.com/hongaah.png',
    name: 'Hazel Wei',
    desc: "Swiftcode's Author",
    org: 'InhiblabCore',
    orgLink: "https://github.com/InhiblabCore",
    title: 'Core developer',
    links: [
      { icon: 'github', link: 'https://github.com/hongaah' }
    ]
  },
  {
    avatar: 'https://www.github.com/XiaoDaiGua-Ray.png',
    name: 'XiaoDaiGua Ray',
    desc: "Tring be better～",
    org: 'InhiblabCore',
    orgLink: "https://github.com/InhiblabCore",
    title: 'Core developer',
    links: [
      { icon: 'github', link: 'https://github.com/XiaoDaiGua-Ray' }
    ]
  },
]