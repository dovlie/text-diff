import React, { useState } from 'react';
import styles from './index.less';
import Diff from 'text-diff'
import { Button } from 'antd'
import { useEffect } from 'react';

const FieldsTypeEnum = Object.freeze({
  field_delete: -1, // 删除
  field_add: 1,     // 新增
  field_noChange: 0,// 不变
})

export default function IndexPage() {
  const diff = new Diff()
  const [prettyText, setPrettyDiff] = useState<any>(null)
  const [comparedText, setComparedText] = useState<any>(null)
  // const oldText = '局部止血: 用灭菌氯化钠注射液溶解成 50～200 单位/ml 的加四个字溶液或用本品加四个字干粉洒于创面。消化道止血: 用生理盐水或温开水（不超过 37 ℃ ）溶解成 10～100 单位/ml 的溶液，口服或局部灌注，也可根据出血部位及程度增减浓度、次数。'
  // const afterText = '局部止血: 用灭菌氯化钠注射液溶解成 50～200 单位/ml 的溶液喷雾或用本品干粉洒用于创面消毒。消化道止血: 用生理盐水或温开水（不超过 37 ℃ ）溶解成 20～100 单位/ml 的溶液，口服或者局部灌注，也可根据出血部位及程度增减浓度。'

  const [originText, setOriginText] = useState<any>('我等会就去吃饭')
  const [afterText, setAfterText] = useState<any>('我再工作一会就和你一块吃饭')

  // 执行确定变更操作
  const doYesChioce =(inx: number) => {
    const ct = comparedText?.[inx]?.[0]
    let origin_text = ''
    if(ct === FieldsTypeEnum.field_add) {
      comparedText?.map((v: any, cinx: number) => {
        if(v[0] === FieldsTypeEnum.field_noChange || v[0] === FieldsTypeEnum.field_delete || cinx === inx) {
          origin_text = origin_text.concat(v[1])
        }
      })
      setOriginText(origin_text)
    }
    if(ct === FieldsTypeEnum.field_delete) {
      comparedText?.map((v: any, cinx: number) => {
        if(v[0] === FieldsTypeEnum.field_noChange && cinx !== inx) {
          origin_text = origin_text.concat(v[1])
        }
      })
      setOriginText(origin_text)
    }
  }

  // 执行取消变更操作
  const doCancelChioce =(inx: number) => {
    const ct = comparedText?.[inx]?.[0]
    let after_text = ''
    if(ct === FieldsTypeEnum.field_add) {
      comparedText?.map((v: any, cinx: number) => {
        if(v[0] === FieldsTypeEnum.field_noChange || (v[0] === FieldsTypeEnum.field_add && cinx !== inx)) {
          after_text = after_text.concat(v[1])
        }
      })
      setAfterText(after_text)
    }
    if(ct === FieldsTypeEnum.field_delete) {
      comparedText?.map((v: any, cinx: number) => {
        if(v[0] === FieldsTypeEnum.field_noChange || v[0] === FieldsTypeEnum.field_add || cinx === inx) {
          after_text = after_text.concat(v[1])
        }
      })
      setAfterText(after_text)
    }
  }

  const renderChoice = (inx: number) => {
    return (
    <span className={styles.select}> 
    [
    <span className={styles.agree} onClick={() => doYesChioce(inx)}>yes</span>，
    <span className={styles.reject} onClick={() => doCancelChioce(inx)}>cancel</span>
    ] 
    </span>
    )
  }

  const handleRejectChangeAll = () => {
    setAfterText(originText)
    console.log('>>>拒绝全部变更', originText)
  }

  const handleAgreeChangeAll = () => {
    setOriginText(afterText)
    console.log('>>>接受全部变更', afterText)
  }

  const prettyHtml = (diffs: any) => {
    var html = [];  
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_br = /\n/g;
    for (let x = 0; x < diffs?.length; x++) {
      console.log(diffs[x],  x)
      var op = diffs[x][0];    // Operation (insert, delete, equal)
      var data = diffs[x][1];  // Text of change.
      var text = data?.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
          .replace(pattern_gt, '&gt;').replace(pattern_br, '<br/>');
      switch (op) {
        case FieldsTypeEnum.field_add:
          html.push(<span key={x}><ins> {text} </ins>{renderChoice(x)}</span>);
          break;
        case FieldsTypeEnum.field_delete:
          html.push(<span key={x}><del> {text} </del>{renderChoice(x)}</span>);
          break;
        case FieldsTypeEnum.field_noChange:
          html.push(<span key={x}> {text} </span>);
          break;
      }
    }
    return html
  }

  useEffect(() => {
    setPrettyDiff(prettyHtml(comparedText))
  }, [comparedText])

  useEffect(() => {
    const textDiff = diff.main(originText, afterText)
    console.log('>>>new', textDiff)
    setComparedText(textDiff)
  }, [originText, afterText])

  return (
    <div className={styles.diffText}>
      <>
      <Button onClick={handleRejectChangeAll}>拒绝变更</Button>
      <Button onClick={handleAgreeChangeAll} type='primary' style={{marginLeft: 10}}>接受变更</Button>
      <div style={{marginTop: 20}}>{prettyText}</div>
      </>
    </div>
  );
}
