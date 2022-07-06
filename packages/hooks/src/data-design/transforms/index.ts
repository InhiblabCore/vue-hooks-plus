// transform 注册中心

export class Transforms {
	/**
	 * 已注册的 Transform（key-value 对）
	 */
	static transforms: Record<string, any> = {}

	static registerTransform(name: string, transform: any): void {
		Transforms.transforms[name] = transform
	}

	static getTransform(name: string): Function {
		return Transforms.transforms[name] || Transforms.transforms.default
	}

	static Transforms: typeof Transforms = Transforms
}
