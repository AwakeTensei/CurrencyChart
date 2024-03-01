import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { useState } from 'react';

type Currency = 'Курс доллара' | 'Курс евро' | 'Курс юаня';

const currencySymbols: Record<Currency, string> = {
  'Курс доллара': '$',
  'Курс евро': '€',
  'Курс юаня': '¥',
};

const currencies: Currency[] = ['Курс доллара', 'Курс евро', 'Курс юаня'];

export const ChoiceCurrency = ({ onChange }: { onChange: (value: Currency) => void }) => {
  const [value, setValue] = useState<Currency>(currencies[0]);

  return (
    <div>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => {
          setValue(value as Currency);
          onChange(value as Currency);
        }}
        items={currencies}
        getItemLabel={(item: Currency) => currencySymbols[item]}
        multiple={false}
        name="ChoiceCurrency"
        size="s"
      />
    </div>
  );
};