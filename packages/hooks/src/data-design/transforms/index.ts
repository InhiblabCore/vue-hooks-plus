/**
 *  Transform（key 注册中心
 * */

import { TransformType } from '../type'

export class Transforms {
	/**
	 * 已注册的 Transform（key-value 键值对）
	 */
	static transforms: Record<string, any> = {}

	static registerTransform<K extends keyof TransformType>(
		name: K,
		transform: (data: any, options: TransformType[K]) => void
	): void {
		Transforms.transforms[name] = transform
	}

	static getTransform(name: keyof TransformType): Function {
		return Transforms.transforms[name] || Transforms.transforms.default
	}
	static Transforms: typeof Transforms = Transforms
}
