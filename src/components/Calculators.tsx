import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Shield, Clock } from 'lucide-react';

interface SliderInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    prefix?: string;
    suffix?: string;
}

const SliderInput = ({ label, value, onChange, min, max, step, prefix = '', suffix = '' }: SliderInputProps) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">{label}</label>
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full">Drag to adjust</span>
            </div>
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${percentage}%, #cbd5e1 ${percentage}%, #cbd5e1 100%)`
                    }}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:bg-emerald-700 [&::-webkit-slider-thumb]:transition-colors [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:hover:bg-emerald-700 [&::-moz-range-thumb]:transition-colors"
                />
            </div>
            <div className="mt-2 text-lg font-bold text-slate-900">
                {prefix}{value.toLocaleString()}{suffix}
            </div>
        </div>
    );
};

export const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(1000000);
    const [interestRate, setInterestRate] = useState(10.5);
    const [tenure, setTenure] = useState(5);

    const calculateEMI = () => {
        const r = interestRate / 12 / 100;
        const n = tenure * 12;
        const emi = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();
    const totalPayment = emi * tenure * 12;
    const totalInterest = totalPayment - loanAmount;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">EMI Calculator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <SliderInput
                        label="Loan Amount (₹)"
                        value={loanAmount}
                        onChange={setLoanAmount}
                        min={100000}
                        max={10000000}
                        step={50000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Interest Rate (% p.a)"
                        value={interestRate}
                        onChange={setInterestRate}
                        min={5}
                        max={20}
                        step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Loan Tenure (Years)"
                        value={tenure}
                        onChange={setTenure}
                        min={1}
                        max={30}
                        step={1}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Monthly EMI</div>
                        <div className="text-4xl font-bold text-emerald-600">₹{emi.toLocaleString()}</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Principal Amount</span>
                            <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Total Interest</span>
                            <span className="font-bold text-slate-900">₹{totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="pt-4 border-t border-slate-200 flex justify-between text-base">
                            <span className="font-bold text-slate-900">Total Payment</span>
                            <span className="font-bold text-emerald-700">₹{totalPayment.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SIPCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);

    const calculateSIP = () => {
        const i = expectedReturn / 12 / 100;
        const n = timePeriod * 12;
        const totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        return Math.round(totalValue);
    };

    const totalValue = calculateSIP();
    const investedAmount = monthlyInvestment * timePeriod * 12;
    const estimatedReturns = totalValue - investedAmount;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">SIP Calculator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <SliderInput
                        label="Monthly Investment (₹)"
                        value={monthlyInvestment}
                        onChange={setMonthlyInvestment}
                        min={500}
                        max={100000}
                        step={500}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Expected Return (% p.a)"
                        value={expectedReturn}
                        onChange={setExpectedReturn}
                        min={5}
                        max={30}
                        step={0.5}
                        suffix="%"
                    />
                    <SliderInput
                        label="Time Period (Years)"
                        value={timePeriod}
                        onChange={setTimePeriod}
                        min={1}
                        max={30}
                        step={1}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Total Value</div>
                        <div className="text-4xl font-bold text-emerald-600">₹{totalValue.toLocaleString()}</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Invested Amount</span>
                            <span className="font-bold text-slate-900">₹{investedAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Est. Returns</span>
                            <span className="font-bold text-emerald-600">₹{estimatedReturns.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const InsuranceCalculator = () => {
    const [age, setAge] = useState(30);
    const [sumInsured, setSumInsured] = useState(500000);
    const [members, setMembers] = useState(2);

    // Simplified calculation logic for demo
    const calculatePremium = () => {
        let basePremium = 5000;
        // Age factor
        if (age > 30) basePremium += (age - 30) * 200;
        // Sum insured factor
        basePremium += (sumInsured / 100000) * 1000;
        // Members factor
        basePremium *= members * 0.8; // 20% discount for family floater logic

        return Math.round(basePremium);
    };

    const premium = calculatePremium();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Health Insurance Premium Estimator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <SliderInput
                        label="Age of Eldest Member"
                        value={age}
                        onChange={setAge}
                        min={18}
                        max={75}
                        step={1}
                        suffix=" Years"
                    />
                    <SliderInput
                        label="Sum Insured (₹)"
                        value={sumInsured}
                        onChange={setSumInsured}
                        min={300000}
                        max={5000000}
                        step={100000}
                        prefix="₹"
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Number of Members</label>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setMembers(num)}
                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${members === num
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Estimated Annual Premium</div>
                        <div className="text-4xl font-bold text-emerald-600">₹{premium.toLocaleString()}</div>
                        <p className="text-xs text-slate-400 mt-2">*Indicative premium. Actual may vary.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);

    const calculateCorpus = () => {
        const yearsToRetire = retirementAge - currentAge;
        const inflation = 0.06;
        const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation, yearsToRetire);
        const yearsInRetirement = 20; // Assumed life expectancy after retirement
        const corpus = futureMonthlyExpenses * 12 * yearsInRetirement;
        return Math.round(corpus);
    };

    const corpus = calculateCorpus();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Retirement Planner</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <SliderInput
                        label="Current Age"
                        value={currentAge}
                        onChange={setCurrentAge}
                        min={20}
                        max={50}
                        step={1}
                        suffix=" Years"
                    />
                    <SliderInput
                        label="Retirement Age"
                        value={retirementAge}
                        onChange={setRetirementAge}
                        min={50}
                        max={70}
                        step={1}
                        suffix=" Years"
                    />
                    <SliderInput
                        label="Current Monthly Expenses (₹)"
                        value={monthlyExpenses}
                        onChange={setMonthlyExpenses}
                        min={20000}
                        max={200000}
                        step={5000}
                        prefix="₹"
                    />
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Required Corpus</div>
                        <div className="text-4xl font-bold text-emerald-600">₹{(corpus / 10000000).toFixed(2)} Cr</div>
                        <p className="text-xs text-slate-400 mt-2">*Assuming 6% inflation</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SavingsCalculator = () => {
    const [initialSavings, setInitialSavings] = useState(10000);
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [interestRate, setInterestRate] = useState(6);
    const [years, setYears] = useState(5);

    const calculateSavings = () => {
        const r = interestRate / 100 / 12;
        const n = years * 12;

        // Future value of initial lump sum
        const fvInitial = initialSavings * Math.pow(1 + r, n);

        // Future value of monthly contributions
        const fvMonthly = monthlyContribution * (Math.pow(1 + r, n) - 1) / r;

        return Math.round(fvInitial + fvMonthly);
    };

    const totalSavings = calculateSavings();
    const totalInvested = initialSavings + (monthlyContribution * years * 12);
    const totalInterest = totalSavings - totalInvested;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Savings Goal Calculator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <SliderInput
                        label="Initial Savings (₹)"
                        value={initialSavings}
                        onChange={setInitialSavings}
                        min={0}
                        max={500000}
                        step={5000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Monthly Contribution (₹)"
                        value={monthlyContribution}
                        onChange={setMonthlyContribution}
                        min={500}
                        max={50000}
                        step={500}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Interest Rate (% p.a)"
                        value={interestRate}
                        onChange={setInterestRate}
                        min={1}
                        max={15}
                        step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Duration (Years)"
                        value={years}
                        onChange={setYears}
                        min={1}
                        max={30}
                        step={1}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Total Savings</div>
                        <div className="text-4xl font-bold text-emerald-600">₹{totalSavings.toLocaleString()}</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Total Invested</span>
                            <span className="font-bold text-slate-900">₹{totalInvested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Total Interest Earned</span>
                            <span className="font-bold text-emerald-600">₹{totalInterest.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
