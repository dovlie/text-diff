import React, { useState } from 'react';
import styles from './index.less';
import diff from 'simple-text-diff'
import { useEffect } from 'react';

export default function IndexPage() {
  const [diffText, setdiff] = useState<any>(null)

  useEffect(() => {
    // const oldText = 'One difference is that interfaces create a new name that is used everywhere. Hi. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Wish you happy'
    // const newText = 'One diffenec is that interfaces create a new name that is used everywhere. Type aliases don’t create a new name — for instance, error messages won’t use the alias name. In the code below, hovering over interfaced in an editor will show that it returns an Interface, but will show that aliased returns object literal type.Hope you will be happy every day'
    const oldText = '局部止血: 用灭菌氯化钠注射液溶解成 50～200 单位/ml 的溶液喷雾或用本品干粉洒于创面。消化道止血: 用生理盐水或温开水（不超过 37 ℃ ）溶解成 10～100 单位/ml 的溶液，口服或局部灌注，也可根据出血部位及程度增减浓度、次数。'
    const newText = '局部止血: 用灭菌氯化钠注射液溶解成 50～200 单位/ml 的溶液喷雾或用本品干粉洒用于创面消毒。消化道止血: 用生理盐水或温开水（不超过 37 ℃ ）溶解成 20～100 单位/ml 的溶液，口服或者局部灌注，也可根据出血部位及程度增减浓度。'
    //one way 
    const result1 = diff.diffPatch(oldText, newText)
    const result2 = diff.diffPatchBySeparator(oldText, newText,'.')
    setdiff(result1)
    console.log(result1)
  }, [])
  return (
    <div className={styles.diffText}>
      <div dangerouslySetInnerHTML={{ __html: diffText?.before || '' }} />
      <div dangerouslySetInnerHTML={{ __html: diffText?.after || '' }} />
    </div>
  );
}
