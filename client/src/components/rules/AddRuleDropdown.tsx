import { useState, useRef, useEffect } from 'react';
import { useRuleStore } from '../../store/useRuleStore';
import {
  RuleType,
  CasingType,
  NumberingPlacement,
  CasingRule,
  PrefixRule,
  SuffixRule,
  NumberingRule,
  FindReplaceRule,
} from '../../types/Rule';

/**
 * Dropdown menu for adding new rules
 */
export function AddRuleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addRule } = useRuleStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddRule = (type: RuleType) => {
    let newRule;

    switch (type) {
      case RuleType.CASING:
        newRule = {
          type: RuleType.CASING,
          caseType: CasingType.LOWER_CASE,
          enabled: true,
        } as Omit<CasingRule, 'id' | 'name'>;
        break;

      case RuleType.PREFIX:
        newRule = {
          type: RuleType.PREFIX,
          prefix: '',
          enabled: true,
        } as Omit<PrefixRule, 'id' | 'name'>;
        break;

      case RuleType.SUFFIX:
        newRule = {
          type: RuleType.SUFFIX,
          suffix: '',
          enabled: true,
        } as Omit<SuffixRule, 'id' | 'name'>;
        break;

      case RuleType.NUMBERING:
        newRule = {
          type: RuleType.NUMBERING,
          startValue: 1,
          padding: 3,
          placement: NumberingPlacement.SUFFIX,
          enabled: true,
        } as Omit<NumberingRule, 'id' | 'name'>;
        break;

      case RuleType.FIND_REPLACE:
        newRule = {
          type: RuleType.FIND_REPLACE,
          find: '',
          replace: '',
          caseSensitive: false,
          replaceAll: true,
          enabled: true,
        } as Omit<FindReplaceRule, 'id' | 'name'>;
        break;

      default:
        return;
    }

    addRule(newRule);
    setIsOpen(false);
  };

  const ruleTypes = [
    {
      type: RuleType.CASING,
      label: 'Casing',
      description: 'Change case (snake_case, camelCase, etc.)',
      icon: 'Aa',
    },
    {
      type: RuleType.PREFIX,
      label: 'Prefix',
      description: 'Add text before filename',
      icon: '←',
    },
    {
      type: RuleType.SUFFIX,
      label: 'Suffix',
      description: 'Add text after filename',
      icon: '→',
    },
    {
      type: RuleType.NUMBERING,
      label: 'Numbering',
      description: 'Add sequential numbers',
      icon: '123',
    },
    {
      type: RuleType.FIND_REPLACE,
      label: 'Find & Replace',
      description: 'Find and replace text',
      icon: '⇄',
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
      >
        <span className="text-xl">+</span>
        Add Rule
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 px-3 py-2 font-medium">
              Choose a rule type:
            </p>
            {ruleTypes.map((ruleType) => (
              <button
                key={ruleType.type}
                onClick={() => handleAddRule(ruleType.type)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-start gap-3"
              >
                <span className="text-2xl w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                  {ruleType.icon}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {ruleType.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {ruleType.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
