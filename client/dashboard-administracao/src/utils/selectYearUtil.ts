function processYearSelection(newValueYear: any, newValueCity?: any) {
    const yearObject: Record<string,any> = newValueYear
    const selectedYear: Object = newValueCity
    const keys = Object.keys(yearObject)
    
    const latestYear: string[] = Object.entries(yearObject).map(([key]) => key)

    const yearVal = Object.values( selectedYear ?? {})
    const yearArray= yearObject[yearVal[0]]

    const selectOption = keys.map(key => {
      return {name: key}
    })

    return {
        selectOption,
        yearArray,
        latestYear
    }

}

export default processYearSelection