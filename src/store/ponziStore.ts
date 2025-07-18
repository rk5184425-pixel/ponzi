import { create } from 'zustand';

export interface Investor {
  id: number;
  name: string;
  investment: number;
  recruits: number[];
  totalEarned: number;
  netProfit: number;
  joinedRound: number;
  level: number;
}

interface PonziState {
  investors: Investor[];
  totalInvested: number;
  totalPaidOut: number;
  currentRound: number;
  isCollapsed: boolean;
  autoRun: boolean;
  investmentAmount: number;
}

interface PonziActions {
  addInvestors: (count: number) => void;
  resetSimulation: () => void;
  setAutoRun: (autoRun: boolean) => void;
  setInvestmentAmount: (amount: number) => void;
}

export const usePonziStore = create<PonziState & PonziActions>((set, get) => ({
  investors: [
    {
      id: 1,
      name: "Founder (You)",
      investment: 1000,
      recruits: [],
      totalEarned: 0,
      netProfit: -1000,
      joinedRound: 0,
      level: 0
    }
  ],
  totalInvested: 1000,
  totalPaidOut: 0,
  currentRound: 0,
  isCollapsed: false,
  autoRun: false,
  investmentAmount: 500,

  addInvestors: (count: number) => {
    const state = get();
    if (state.isCollapsed) return;

    const newInvestors: Investor[] = [];
    const currentLevel = Math.floor(Math.log2(state.investors.length + count)) + 1;
    
    for (let i = 0; i < count; i++) {
      const newInvestor: Investor = {
        id: state.investors.length + i + 1,
        name: `Investor ${state.investors.length + i + 1}`,
        investment: state.investmentAmount,
        recruits: [],
        totalEarned: 0,
        netProfit: -state.investmentAmount,
        joinedRound: state.currentRound + 1,
        level: currentLevel
      };
      newInvestors.push(newInvestor);
    }

    // Calculate payouts to existing investors
    const totalNewMoney = count * state.investmentAmount;
    const availableForPayouts = totalNewMoney * 0.8; // 20% kept as "profit"
    
    const updatedInvestors = [...state.investors];
    let remainingPayout = availableForPayouts;

    // Pay earlier investors first (FIFO)
    for (let i = 0; i < updatedInvestors.length && remainingPayout > 0; i++) {
      const payout = Math.min(remainingPayout, updatedInvestors[i].investment * 0.2);
      updatedInvestors[i].totalEarned += payout;
      updatedInvestors[i].netProfit += payout;
      remainingPayout -= payout;
    }

    // Check for collapse conditions
    const recentInvestors = [...updatedInvestors, ...newInvestors].filter(
      inv => inv.joinedRound >= state.currentRound - 1
    ).length;
    
    const growthRate = recentInvestors / Math.max(1, state.investors.length * 0.3);
    const shouldCollapse = state.currentRound > 8 && 
                          state.investors.length >= 50 && 
                          (growthRate < 0.1 || Math.random() < 0.15);

    set({
      investors: [...updatedInvestors, ...newInvestors],
      totalInvested: state.totalInvested + totalNewMoney,
      totalPaidOut: state.totalPaidOut + (availableForPayouts - remainingPayout),
      currentRound: state.currentRound + 1,
      isCollapsed: shouldCollapse,
      autoRun: shouldCollapse ? false : state.autoRun
    });
  },

  resetSimulation: () => {
    set({
      investors: [
        {
          id: 1,
          name: "Founder (You)",
          investment: 1000,
          recruits: [],
          totalEarned: 0,
          netProfit: -1000,
          joinedRound: 0,
          level: 0
        }
      ],
      totalInvested: 1000,
      totalPaidOut: 0,
      currentRound: 0,
      isCollapsed: false,
      autoRun: false
    });
  },

  setAutoRun: (autoRun: boolean) => {
    set({ autoRun });
  },

  setInvestmentAmount: (amount: number) => {
    set({ investmentAmount: amount });
  }
}));

// Auto-run effect (would be implemented in a React component)
let autoRunInterval: NodeJS.Timeout | null = null;

export const startAutoRun = () => {
  const { autoRun, isCollapsed, addInvestors } = usePonziStore.getState();
  
  if (autoRunInterval) {
    clearInterval(autoRunInterval);
  }

  if (autoRun && !isCollapsed) {
    autoRunInterval = setInterval(() => {
      const state = usePonziStore.getState();
      if (state.autoRun && !state.isCollapsed) {
        const newCount = Math.max(1, Math.floor(Math.random() * 3) + 1);
        addInvestors(newCount);
      } else {
        if (autoRunInterval) {
          clearInterval(autoRunInterval);
          autoRunInterval = null;
        }
      }
    }, 2000);
  }
};

export const stopAutoRun = () => {
  if (autoRunInterval) {
    clearInterval(autoRunInterval);
    autoRunInterval = null;
  }
};