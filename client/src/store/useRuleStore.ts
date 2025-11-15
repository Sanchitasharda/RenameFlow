import { create } from 'zustand';
import type { Rule, RuleType, RuleConfig } from '../types/Rule';

interface RuleState {
  /** List of transformation rules */
  rules: Rule[];

  /** Add a new rule */
  addRule: (rule: Omit<Rule, 'id' | 'name'>) => void;

  /** Update an existing rule */
  updateRule: (ruleId: string, updates: Partial<Omit<Rule, 'id' | 'type'>>) => void;

  /** Remove a rule by ID */
  removeRule: (ruleId: string) => void;

  /** Toggle rule enabled/disabled */
  toggleRule: (ruleId: string) => void;

  /** Reorder rules (for drag & drop) */
  reorderRules: (startIndex: number, endIndex: number) => void;

  /** Clear all rules */
  clearRules: () => void;

  /** Get rule by ID */
  getRuleById: (ruleId: string) => Rule | undefined;

  /** Get all enabled rules */
  getEnabledRules: () => Rule[];
}

export const useRuleStore = create<RuleState>((set, get) => ({
  rules: [],

  addRule: (ruleWithoutId) =>
    set((state) => {
      const newRule: Rule = {
        ...ruleWithoutId,
        id: crypto.randomUUID(),
      } as Rule;
      return {
        rules: [...state.rules, newRule],
      };
    }),

  updateRule: (ruleId, updates) =>
    set((state) => ({
      rules: state.rules.map((rule) => {
        if (rule.id !== ruleId) return rule;

        // Merge config if provided
        if ('config' in updates && updates.config) {
          return {
            ...rule,
            ...updates,
            config: { ...rule.config, ...updates.config },
          } as Rule;
        }

        return { ...rule, ...updates } as Rule;
      }),
    })),

  removeRule: (ruleId) =>
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== ruleId),
    })),

  toggleRule: (ruleId) =>
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      ),
    })),

  reorderRules: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.rules);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { rules: result };
    }),

  clearRules: () =>
    set({
      rules: [],
    }),

  getRuleById: (ruleId) => get().rules.find((rule) => rule.id === ruleId),

  getEnabledRules: () => get().rules.filter((rule) => rule.enabled),
}));
