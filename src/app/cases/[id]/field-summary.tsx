import { ApplicationFieldStatus, CONFIDENCE_THRESHOLD, FieldAnalysisResult } from '@/models/case';
import { set } from 'date-fns';
import { BadgeAlertIcon, BadgeCheckIcon, BadgeXIcon, CheckCircle2Icon, InfoIcon, UserCheckIcon, UserSearchIcon, UserXIcon } from 'lucide-react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState } from 'react';

type FieldSummaryProps = {
  value: FieldAnalysisResult,
  index?: number,
  onMoreInfo?: (e: any) => void,
  onApprove?: (e: any) => void,
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
  const ref = f.documents.find(d => {
    if (d.isRef) {
      return true;
    }
  });
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
    confidence: ref?.confidence || 1,
    value: ref?.value || ""
  });

  const [value, setValue] = useState(result.value);
  // const [status, setStatus] = useState(f.status);
  const status = f.status;

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
            status === "APPROVED" || result.confidence > CONFIDENCE_THRESHOLD ? (
              <BadgeCheckIcon id={componentIds.confidenceMarkHigh} size={iconSize} className={`${iconClass} text-green-500`}>
                <Tooltip target={`#${componentIds.confidenceMarkHigh}`} content={`Great confidence`} />
              </BadgeCheckIcon>
            ) : (result.confidence === 0 && result.value === "" ? (
              <BadgeXIcon id={componentIds.confidenceMarkLow} size={iconSize} className={`${iconClass} text-red-500`} >
                <Tooltip target={`#${componentIds.confidenceMarkLow}`} content={`Potential conflict
                  `} />
              </BadgeXIcon>
            ) : (
              <BadgeAlertIcon id={componentIds.confidenceMarkMid} size={iconSize} className={`${iconClass} text-orange-300`} >
                <Tooltip target={`#${componentIds.confidenceMarkMid}`} content={`Lower confidence`} />
              </BadgeAlertIcon>
            )
            )
          }
          {
            status === ApplicationFieldStatus.Approved ? (
              <UserCheckIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-green-500`} />
            ) : (status === ApplicationFieldStatus.Rejected ?
              <UserXIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-red-500`} /> :
              <UserSearchIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-gray-400`} />
            )
          }
          <CheckCircle2Icon id={componentIds.fieldApprove} size={iconSize} className={iconClassClickable} onClick={props.onApprove}>
            <Tooltip target={`#${componentIds.fieldApprove}`} content="Approve" />
          </CheckCircle2Icon>
          <Tooltip target={`#${componentIds.userChecked}`} content={status === ApplicationFieldStatus.Approved ? 'Approved' : `Pending Checker`} />
        </div>
      </div>
    )
  }

  return (
    <Card subTitle={subTitle} className="mr-2 my-1">
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
  )
}