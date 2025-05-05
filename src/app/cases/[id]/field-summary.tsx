import { CaseFieldStatus, FieldAnalysisResult } from '@/models/case';
import { BadgeAlertIcon, BadgeCheckIcon, CheckCircle2Icon, InfoIcon, UserCheckIcon, UserSearchIcon, UserXIcon } from 'lucide-react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState } from 'react';

type FieldSummaryProps = {
  value: FieldAnalysisResult,
  index?: number,
  onMoreInfo?: (e: any) => void,
}

export default function FieldSummary(props: FieldSummaryProps) {
  const f = props.value;


  const iconSize = "1.5rem";
  const iconClass = "icon m-1";
  const iconClassClickable = "icon action m-1 cursor-pointer";

  const componentIds = {
    fieldInfo: `field-info-${props.index}`,
    fieldApprove: `field-approve-${props.index}`,
    fieldReject: `field-reject-${props.index}`,
    confidenceMarkHigh: `confidence-mark-high-${props.index}`,
    confidenceMarkMid: `confidence-mark-mid-${props.index}`,
    confidenceMarkLow: `confidence-mark-low-${props.index}`,
    userChecked: `user-checked-${props.index}`,
    userRejected: `user-rejected-${props.index}`
  }

  const result = f.documents.reduce((prev, doc) => {
    if (prev.value === doc.value) {
      return {
        confidence: Math.min(prev.confidence, doc.confidence),
        value: prev.value
      }
    }
    else {
      return {
        confidence: 0,
        value: ""
      }
    }
  }, {
    confidence: 1,
    value: f.documents[0].value
  });
  
  const [value, setValue] = useState(result.value);
  const [status, setStatus] = useState(f.status);

  const subTitle = () => {
    return (
      <div className="horizontal justify-between">
        {/* <div className='flex flex-row'>
          <div >
            {props.index?.toString()}
          </div>
          {f.name}
        </div> */}
        <div className="cursor-pointer" onClick={props.onMoreInfo}>{f.name}</div>
        <div className="horizontal">
          {
            status === "APPROVED" || result.confidence > 0.8 ? (
              <BadgeCheckIcon id={componentIds.confidenceMarkHigh} size={iconSize} className={`${iconClass} text-green-500`}>
                <Tooltip target={`#${componentIds.confidenceMarkHigh}`} content={`Great confidence`} />
              </BadgeCheckIcon>
            ) : (result.confidence === 0 && result.value === "" ? (
              <BadgeAlertIcon id={componentIds.confidenceMarkLow} size={iconSize} className={`${iconClass} text-red-500`} >
                <Tooltip target={`#${componentIds.confidenceMarkLow}`} content={`Conflicting Values`} />
              </BadgeAlertIcon>
            ) : (
              <BadgeAlertIcon id={componentIds.confidenceMarkMid} size={iconSize} className={`${iconClass} text-yellow-300`} >
                <Tooltip target={`#${componentIds.confidenceMarkMid}`} content={`Lower confidence`} />
              </BadgeAlertIcon>
            ) 
            )
          }
          {
            status === CaseFieldStatus.Approved ? (
              <UserCheckIcon id={componentIds.userChecked}size={iconSize} className={`${iconClass} text-green-500`} />
            ) : (status === CaseFieldStatus.Rejected ? 
              <UserXIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-red-500`} /> :
              <UserSearchIcon id={componentIds.userChecked} size={iconSize} className={`${iconClassClickable} text-gray-400`} onClick={e => setStatus(CaseFieldStatus.Approved)} />
            )
          }
          <Tooltip target={`#${componentIds.userChecked}`}  content={status === CaseFieldStatus.Approved ? 'Approved' : `Pending Checker`} />
        </div>
      </div>
    )
  }

  return (
    <Card subTitle={subTitle} className="mx-2 my-1">
      {/* <div className="flex flex-row items-center justify-between">
        <InputText value={value} onChange={e => setValue(e.target.value)} className="p-inputtext-sm" disabled={status !== CaseFieldStatus.Pending}/>
        <div className='flex flex-row'>
          <InfoIcon id={componentIds.fieldInfo} size={iconSize} className={iconClassClickable} onClick={props.onMoreInfo}>
            <Tooltip target={`#${componentIds.fieldInfo}`} content="View Documents" />
          </InfoIcon>
          <CheckCircle2Icon id={componentIds.fieldApprove} size={iconSize} className={iconClassClickable} onClick={e => setStatus(CaseFieldStatus.Approved)}>
            <Tooltip target={`#${componentIds.fieldApprove}`} content="Approve" />
          </CheckCircle2Icon>
          <XCircleIcon id={componentIds.fieldReject} size={iconSize} className={iconClassClickable} onClick={e => setStatus(CaseFieldStatus.Rejected)}>
            <Tooltip target={`#${componentIds.fieldReject}`} content="Reject" />
          </XCircleIcon>
        </div>
      </div> */}
    </Card>
    // <div className="field-summary grid grid-cols-3 items-center" key={f.name}>
    //   <div className="col-span-1 flex flex-col">
    //     <p className="text-sm">{f.name}</p>
    //   </div>
    //   <div className="col-span-1 flex flex-col gap-2">

    //   </div>
    //   <div className="col-span-1 flex flex-col">

    //   </div>
    // </div>
  )
}