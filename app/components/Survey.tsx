'use client';

import { useState } from 'react';

interface ListType {
  veg: boolean[];
  multigrain: boolean[];
  seaweed: boolean[];
  mushroom: boolean[];
  soybean: boolean[];
  fruit: boolean[];
  milk: boolean[];
  fish: boolean[];
  lowfatmeat: boolean[];
  fried: boolean[];
  eggs: boolean[];
  eelsquidshrimp: boolean[];
  beefsoup: boolean[];
  highfatmeat: boolean[];
  guts: boolean[];
  fermentedfish: boolean[];
  butter: boolean[];
  desert: boolean[];
  alcohol: boolean[];
  noodle: boolean[];
  icecream: boolean[];
  coffee: boolean[];
}
const itemMap = {
    'veg': '야채',
    'multigrain': '잡곡밥',
    'seaweed': '해조류',
    'mushroom': '버섯',
    'soybean': '콩',
    'fruit': '과일',
    'milk': '우유',
    'fish': '생선',
    'lowfatmeat': '육류',
    'fried': '튀김, 볶음',
    'eggs': '난류',
    'eelsquidshrimp': '장어, 미꾸라지, 오징어, 새우',
    'beefsoup': '탕류',
    'highfatmeat': '기름기 많은 고기',
    'guts': '내장',
    'fermentedfish': '젓갈, 장아찌',
    'butter': '버터, 마요네즈',
    'desert': '제과류',
    'alcohol': '술',
    'noodle': '라면, 국수',
    'icecream': '아이스크림',
    'coffee': '커피, 청량음료, 주스',
}
type ListInKoreanType =
  | '야채'
  | '잡곡밥'
  | '해조류'
  | '버섯'
  | '콩'
  | '과일'
  | '우유'
  | '생선'
  | '육류'
  | '튀김, 볶음'
  | '난류'
  | '장어, 미꾸라지, 오징어, 새우'
  | '탕류'
  | '기름기 많은 고기'
  | '내장'
  | '젓갈, 장아찌'
  | '버터, 마요네즈'
  | '제과류'
  | '술'
  | '라면, 국수'
  | '아이스크림'
  | '커피, 청량음료, 주스';

const defaultState = {
  veg: [false, false, false, false, false, false],
  multigrain: [false, false, false, false, false, false],
  seaweed: [false, false, false, false, false, false],
  mushroom: [false, false, false, false, false, false],
  soybean: [false, false, false, false, false, false],
  fruit: [false, false, false, false, false, false],
  milk: [false, false, false, false, false, false],
  fish: [false, false, false, false, false, false],
  lowfatmeat: [false, false, false, false, false, false],
  fried: [false, false, false, false, false, false],
  eggs: [false, false, false, false, false, false],
  eelsquidshrimp: [false, false, false, false, false, false],
  beefsoup: [false, false, false, false, false, false],
  highfatmeat: [false, false, false, false, false, false],
  guts: [false, false, false, false, false, false],
  fermentedfish: [false, false, false, false, false, false],
  butter: [false, false, false, false, false, false],
  desert: [false, false, false, false, false, false],
  alcohol: [false, false, false, false, false, false],
  noodle: [false, false, false, false, false, false],
  icecream: [false, false, false, false, false, false],
  coffee: [false, false, false, false, false, false],
};
const safety = {
  veg: 1,
  multigrain: 1,
  seaweed: 1,
  mushroom: 1,
  soybean: 2,
  fruit: 2,
  milk: 2,
  fish: 2,
  lowfatmeat: 3,
  fried: 3,
  eggs: 3,
  eelsquidshrimp: 4,
  beefsoup: 4,
  highfatmeat: 4,
  guts: 5,
  fermentedfish: 5,
  butter: 5,
  desert: 6,
  alcohol: 6,
  noodle: 6,
  icecream: 6,
  coffee: 6,
};
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
type StateEntriesType = Entries<ListType>;
export default function Example() {
  const [state, setState] = useState(defaultState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    for (const [key, checks] of Object.entries(state) as StateEntriesType) {
      if (!checks.includes(true)) {
        alert(`${itemMap[key]} 항목을 체크해주세요.`);
        return;
      }
    }
    setIsSubmitted(true);
  };
  const handleChange = (rowKey: keyof ListType, index: number) => {
    setState(prev => {
      const newRowState = prev[rowKey].map((_checked, i) => i === index);
      return { ...prev, [rowKey]: newRowState };
    });
  };
  const renderRow = (rowKey: keyof ListType, label: ListInKoreanType) => (
    <tr>
      <th>{label}</th>
      {state[rowKey].map((isChecked, index) => {
        return (
          <td
            key={index}
            className={
              !isSubmitted
                ? ''
                : safety[rowKey] - 1 === index
                ? 'bg-sky-500'
                : isChecked && ((safety[rowKey] < 3 && safety[rowKey] - 1 < index) || safety[rowKey] > 3 && safety[rowKey] - 1 > index)
                ? 'bg-red-500'
                : isChecked && (safety[rowKey] > 3 && safety[rowKey] - 1 < index)
                ? 'bg-green-500'
                : ''
            }
            onClick={!isSubmitted ? () => handleChange(rowKey, index) : () => {}}
          >
            <input type="checkbox" checked={isChecked} />
          </td>
        );
      })}
    </tr>
  );
  return (
    <div className="w-3/4 m-5">
      <table className="table">
        <thead className="sticky top-0 left-0 z-10 bg-grey-100">
          <tr>
            <th rowSpan={2}>식품</th>
            <th colSpan={6}>식품 섭취 빈도</th>
          </tr>
          <tr>
            <th>하루 1-2회</th>
            <th>주 5-6회</th>
            <th>주 3-4회</th>
            <th>주 1-2회</th>
            <th>월 1-2회</th>
            <th>거의 안먹음</th>
          </tr>
        </thead>
        <tbody>
          {renderRow('veg', '야채')}
          {renderRow('multigrain', '잡곡밥')}
          {renderRow('seaweed', '해조류')}
          {renderRow('mushroom', '버섯')}
          {renderRow('soybean', '콩')}
          {renderRow('fruit', '과일')}
          {renderRow('milk', '우유')}
          {renderRow('fish', '생선')}
          {renderRow('lowfatmeat', '육류')}
          {renderRow('fried', '튀김, 볶음')}
          {renderRow('eggs', '난류')}
          {renderRow('eelsquidshrimp', '장어, 미꾸라지, 오징어, 새우')}
          {renderRow('beefsoup', '탕류')}
          {renderRow('highfatmeat', '기름기 많은 고기')}
          {renderRow('guts', '내장')}
          {renderRow('fermentedfish', '젓갈, 장아찌')}
          {renderRow('butter', '버터, 마요네즈')}
          {renderRow('desert', '제과류')}
          {renderRow('alcohol', '술')}
          {renderRow('noodle', '라면, 국수')}
          {renderRow('icecream', '아이스크림')}
          {renderRow('coffee', '커피, 청량음료, 주스')}
        </tbody>
      </table>
      <div className="mt-5">
      <button className='box-border px-[30px] py-[16px] min-w-[170px] h-[48px] text-16 text-white-500 font-bold bg-sky-500 rounded-sm hover:bg-sky-600 disabled:bg-sky-400' onClick={handleSubmit}>
        제출
      </button>
      <button
        className="box-border px-[30px] py-[16px] min-w-[170px] h-[48px] text-16 text-sky-500 font-bold border border-sky-500 rounded-sm hover:border-sky-600 hover:text-sky-600 disabled:text-sky-400 disabled:border-sky-400"
        onClick={() => {
          setState(defaultState);
          setIsSubmitted(false);
        }}
      >
        Reset
      </button>
      </div>
    </div>
  );
}
