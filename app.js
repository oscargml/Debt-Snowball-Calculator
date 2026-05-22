/**
 * Calculates the Debt Snowball payoff timeline.
 * @param {Array} debts - Array of debt objects { name, balance, interestRate, minimumPayment }
 * @param {number} extraPayment - Additional cash the user can pay each month above the minimums.
 * @returns {Object} Total months, total interest paid, and a month-by-month schedule.
 */
function calculateDebtSnowball(debts, extraPayment) {
    // 1. Deep copy the inputs to avoid mutating the original data
    let activeDebts = debts.map(d => ({
        name: d.name,
        balance: d.balance,
        interestRate: d.interestRate / 100 / 12, // Convert annual % to monthly decimal
        minPayment: d.minimumPayment
    }));

    // 2. The Core Snowball Rule: Sort strictly by balance (smallest to largest)
    activeDebts.sort((a, b) => a.balance - b.balance);

    let totalMonths = 0;
    let totalInterestPaid = 0;
    const monthlySchedule = [];

    // 3. Month-by-month simulation loop
    while (activeDebts.some(d => d.balance > 0)) {
        totalMonths++;
        let snowballPot = extraPayment; 
        let monthlyRecord = { month: totalMonths, details: [], totalPaidThisMonth: 0 };

        // Step A: Accrue monthly interest across all active debts
        activeDebts.forEach(debt => {
            if (debt.balance > 0) {
                let interestThisMonth = debt.balance * debt.interestRate;
                debt.balance += interestThisMonth;
                totalInterestPaid += interestThisMonth;
            }
        });

        // Step B: Pay the mandatory minimums first
        activeDebts.forEach(debt => {
            if (debt.balance > 0) {
                // Ensure we don't overpay if the balance is less than the minimum
                let payment = Math.min(debt.minPayment, debt.balance);
                debt.balance -= payment;
                monthlyRecord.totalPaidThisMonth += payment;

                // If the debt was paid off early just by the minimum, any leftover min goes to the snowball pot
                if (debt.balance === 0) {
                    snowballPot += (debt.minPayment - payment);
                }
                
                monthlyRecord.details.push({ name: debt.name, remainingBalance: Math.round(debt.balance * 100) / 100 });
            }
        });

        // Step C: Deploy the Snowball Pot to the SMALLEST active debt
        if (snowballPot > 0) {
            // Find the first debt that still has a remaining balance
            let targetDebt = activeDebts.find(d => d.balance > 0);
            
            if (targetDebt) {
                let extraApplied = Math.min(snowballPot, targetDebt.balance);
                targetDebt.balance -= extraApplied;
                monthlyRecord.totalPaidThisMonth += extraApplied;
                
                // Update the balance in our records for this month
                let recordToUpdate = monthlyRecord.details.find(d => d.name === targetDebt.name);
                if (recordToUpdate) {
                    recordToUpdate.remainingBalance = Math.round(targetDebt.balance * 100) / 100;
                }
            }
        }

        // Step D: Clean up and calculate the snowball roll-over for the NEXT month
        // Find debts that were completely wiped out this month
        activeDebts.forEach(debt => {
            if (debt.balance <= 0 && debt.minPayment > 0) {
                // Roll their minimum payment permanently into the extra monthly budget
                extraPayment += debt.minPayment;
                debt.minPayment = 0; // It no longer requires a standalone minimum payment
            }
        });

        monthlySchedule.push(monthlyRecord);

        // Safety break to prevent infinite loops if minimum payments don't cover interest
        if (totalMonths > 600) { 
            throw new Error("Infinite loop detected: Minimum payments are too low to cover the accruing interest.");
        }
    }

    return {
        totalMonths,
        totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
        schedule: monthlySchedule
    };
}