export const DEFAULT_INPUTS = { currentGrade: '80', targetGrade: '120', basisWeight: '82.3', stockFlow: '42.0', steamPressure: '61.5', machineSpeed: '497.0', moisture: '5.1', ash: '2.2', fillerFlow: '11.0' };
export const PRESETS = [
  { name: 'Standard', values: DEFAULT_INPUTS },
  { name: 'High speed', values: { currentGrade: '60', targetGrade: '90', basisWeight: '64.5', stockFlow: '38', steamPressure: '55', machineSpeed: '530', moisture: '4.8', ash: '1.8', fillerFlow: '9.5' } },
  { name: 'Packaging', values: { currentGrade: '100', targetGrade: '150', basisWeight: '105', stockFlow: '51.5', steamPressure: '74', machineSpeed: '440', moisture: '5.9', ash: '3.1', fillerFlow: '14.2' } }
];
export const PARAMETERS = [
  { key: 'basisWeight', label: 'Basis Weight', unit: 'g/m²', result: 'nextBasisWeight' },
  { key: 'stockFlow', label: 'Stock Flow', unit: 'L/min', result: 'nextStockFlow' },
  { key: 'steamPressure', label: 'Steam Pressure', unit: 'kPa', result: 'nextSteamPressure' },
  { key: 'machineSpeed', label: 'Machine Speed', unit: 'm/min', result: 'nextMachineSpeed' },
  { key: 'moisture', label: 'Moisture', unit: '%', result: 'nextMoisture' },
  { key: 'ash', label: 'Ash', unit: '%', result: 'nextAsh' },
  { key: 'fillerFlow', label: 'Filler Flow', unit: 'L/min', result: 'nextFillerFlow' }
];
export const INPUT_FIELDS = [['currentGrade', 'Current Grade', 'GSM'], ['targetGrade', 'Target Grade', 'GSM'], ...PARAMETERS.map(({ key, label, unit }) => [key, label, unit])];
