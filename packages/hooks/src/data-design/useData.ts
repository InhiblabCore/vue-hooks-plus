import { DataType } from './type'
import * as typesCheck from './utils/typesCheck'

export default function useData() {
	const dataType = <D = any>({
		type,
		target,
	}: {
		type: DataType
		target: D
	}) => {
		if (typesCheck?.[type]) {
			return typesCheck?.[type](target)
		} else {
			console.error('Type does not exist')
		}
	}

	return {
		dataType,
	}
}
