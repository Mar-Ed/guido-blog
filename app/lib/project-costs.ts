import budget from "../data/project-costs.json";

export type CostScenario = {
  reuseComputers: boolean;
  contingencyPercent: number;
};

export function toCents(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError("El importe debe ser un número finito mayor o igual a cero.");
  }
  return Math.round((amount + Number.EPSILON) * 100);
}

export function estimateProjectCosts({
  reuseComputers = false,
  contingencyPercent = budget.defaultContingencyPercent,
}: Partial<CostScenario> = {}) {
  if (!Number.isFinite(contingencyPercent) || contingencyPercent < 0 || contingencyPercent > 30) {
    throw new RangeError("La reserva debe estar entre 0 y 30 %.");
  }

  const initialItems = budget.initialItems.map((item) => ({
    ...item,
    quantity: item.id === "computers" && reuseComputers ? 0 : item.quantity,
    totalCents: toCents(item.unitCost * (item.id === "computers" && reuseComputers ? 0 : item.quantity)),
  }));
  const phases = budget.labor.map((phase) => {
    const materialsCents = initialItems
      .filter((item) => item.phase === phase.phase)
      .reduce((sum, item) => sum + item.totalCents, 0);
    const laborCents = toCents(phase.hours * budget.hourlyRate);
    return { ...phase, materialsCents, laborCents, totalCents: materialsCents + laborCents };
  });
  const monthlyItems = budget.monthlyItems.map((item) => ({
    ...item,
    totalCents: toCents(item.quantity * item.unitCost),
  }));
  const materialsCents = initialItems.reduce((sum, item) => sum + item.totalCents, 0);
  const laborCents = phases.reduce((sum, phase) => sum + phase.laborCents, 0);
  const directCents = materialsCents + laborCents;
  const contingencyCents = Math.round(directCents * contingencyPercent / 100);
  const initialCents = directCents + contingencyCents;
  const monthlyCents = monthlyItems.reduce((sum, item) => sum + item.totalCents, 0);
  const annualOperatingCents = monthlyCents * budget.months;

  return {
    initialItems, phases, monthlyItems, materialsCents, laborCents, directCents,
    contingencyCents, initialCents, monthlyCents, annualOperatingCents,
    firstYearCents: initialCents + annualOperatingCents,
    totalHours: phases.reduce((sum, phase) => sum + phase.hours, 0),
  };
}

const soles = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });

export function formatCost(cents: number): string {
  return soles.format(cents / 100);
}
