export interface CovidForStateI {
  id: number
  date: number;
  state: string;
  positive: number;
  probableCases: number;
  negative: number;
  pending: string;
  totalTestResultsSource: string;
  totalTestResults: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  lastUpdateEt: string;
  dateModified: string;
  checkTimeEt: string;
  death: number;
  hospitalized: number;
  hospitalizedDischarged: number;
  dateChecked: string;
  totalTestsViral: number;
  positiveTestsViral: number;
  negativeTestsViral: number;
  positiveCasesViral: number;
  deathConfirmed: number;
  deathProbable: number;
  totalTestEncountersViral: number;
  totalTestsPeopleViral: number;
  totalTestsAntibody: number;
  positiveTestsAntibody: number;
  negativeTestsAntibody: number;
  totalTestsPeopleAntibody: number;
  positiveTestsPeopleAntibody: string;
  negativeTestsPeopleAntibody: string;
  totalTestsPeopleAntigen: number;
  positiveTestsPeopleAntigen: number;
  totalTestsAntigen: string;
  positiveTestsAntigen: string;
  fips: string;
  positiveIncrease: number;
  negativeIncrease: number;
  total: number;
  totalTestResultsIncrease: number;
  posNeg: number;
  dataQualityGrade: string;
  deathIncrease: number;
  hospitalizedIncrease: number;
  hash: string;
  commercialScore: number;
  negativeRegularScore: number;
  negativeScore: number;
  positiveScore: number;
  score: number;
  grade: string
}
