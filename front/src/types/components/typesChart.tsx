export type TypeData = {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
  }[]
}

export type TypeChartComposant = {
  data: TypeData,
  mode: number
}