import { ref, watch } from 'vue'
import useBoolean from '../..//useBoolean'

// 浏览器行为
type BrowserBehaviorOption = {
	browserEvent?: ('contextmenu' | 'selectstart' | 'copy')[]
	keydown?: 'F12'[]
	browserConsole?: boolean
}

function isEmptyObj(obj?: any) {
	return String(obj) === '[object Object]' && Reflect.ownKeys(obj).length === 0
}

// 禁止打开浏览器控制台
const checkConsole = function() {
	console.log(666)

	const _0x1cbb = ['tor', 'struc', 'call', 'ger', 'con', 'bug', 'de', 'apply']
	setInterval(check, 2e3)
	function check() {
		function doCheck(_0x1834ff: number) {
			if (
				('' + _0x1834ff / _0x1834ff).length !== 0x1 ||
				_0x1834ff % 0x14 === 0x0
			) {
				// @ts-ignore
				;(function() {
					return !![]
				}
					[_0x1cbb[0x4] + _0x1cbb[0x1] + _0x1cbb[0x0]](
						_0x1cbb[0x6] + _0x1cbb[0x5] + _0x1cbb[0x3]
					)
					[_0x1cbb[0x2]]())
			} else {
				// @ts-ignore
				;(function() {
					return ![]
				}
					[_0x1cbb[0x4] + _0x1cbb[0x1] + _0x1cbb[0x0]](
						_0x1cbb[0x6] + _0x1cbb[0x5] + _0x1cbb[0x3]
					)
					[_0x1cbb[0x7]]())
			}
			// eslint-disable-next-line no-param-reassign
			doCheck(++_0x1834ff)
		}
		try {
			doCheck(0)
		} catch (err) {}
	}
}

export default function useDisableBrowserBehavior(
	option?: BrowserBehaviorOption
) {
	const [run, { set: toggleRun }] = useBoolean(false)

	if (!option && isEmptyObj(option)) {
		toggleRun(false)
	}

	watch(run, (curr) => {
		if (curr) {
			Object.keys(option!).forEach((optKey) => {
				switch (optKey) {
					case 'browserEvent':
						option?.[optKey]?.forEach((ev) => {
							document.addEventListener(ev, function(event) {
								event.preventDefault()
							})
						})
						break
					case 'keydown':
						option?.[optKey]?.forEach((key: string) => {
							document.addEventListener('keydown', function(event) {
								if (event.key === key) {
									event.preventDefault()
								}
							})
						})
						break
					case 'browserConsole':
						if (!!option?.browserConsole) {
							checkConsole()
							setInterval(function() {
								checkConsole()
							}, 5000)
						}
					default:
						break
				}
			})
		}
	})

	return {
		startRun: () => toggleRun(true),
		stopRun: () => history.go(0),
	}
}
