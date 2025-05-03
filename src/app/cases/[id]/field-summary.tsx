import { CaseFieldStatus } from '@/models/case';
import { BadgeAlertIcon, BadgeCheckIcon, CheckCircle2Icon, InfoIcon, PencilIcon, UserCheckIcon, UserSearchIcon, UserXIcon, XCircleIcon } from 'lucide-react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState } from 'react';

type FieldSummaryProps = {
  value: {
    name: string,
    value: string,
    confidence: number,
    status: string
  },
  index?: number,
  onMoreInfo?: (e: any) => void,
}

export default function FieldSummary(props: FieldSummaryProps) {
  const f = props.value;

  const [value, setValue] = useState(f.value);
  const [status, setStatus] = useState(f.status);

  const iconSize = "1.5rem";
  const iconClass = "icon m-1";
  const iconClassClickable = "icon action m-1 cursor-pointer";

  const componentIds = {
    fieldInfo: `field-info-${props.index}`,
    fieldApprove: `field-approve-${props.index}`,
    fieldReject: `field-reject-${props.index}`,
    confidenceMark: `confidence-mark-${props.index}`,
    userChecked: `user-checked-${props.index}`,
    userRejected: `user-rejected-${props.index}`
  }

  const subTitle = () => {
    return (
      <div className="horizontal justify-between">
        {/* <div className='flex flex-row'>
          <div >
            {props.index?.toString()}
          </div>
          {f.name}
        </div> */}
        {f.name}
        <div className="horizontal">
          {
            status === "APPROVED" || f.confidence > 0.8 ? (
              <BadgeCheckIcon id={componentIds.confidenceMark} size={iconSize} className={`${iconClass} text-green-500`}>
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Great confidence`} />
              </BadgeCheckIcon>
            ) : (
              <BadgeAlertIcon id={componentIds.confidenceMark} size={iconSize} className={`${iconClass} text-yellow-300`} >
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Lower confidence`} />
              </BadgeAlertIcon>
            )
          }
          {
            status === CaseFieldStatus.Approved ? (
              <UserCheckIcon id={componentIds.userChecked}size={iconSize} className={`${iconClass} text-green-500`} >
                <Tooltip target={`#${componentIds.userChecked}`} content={`Approved`} />
              </UserCheckIcon>
            ) : (status === CaseFieldStatus.Rejected ? 
              <UserXIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-red-500`} >
                <Tooltip target={`#${componentIds.userChecked}`} content={`Rejected`} />
              </UserXIcon> : 
              <UserSearchIcon id={componentIds.userChecked} size={iconSize} className={`${iconClass} text-gray-400`} >
                <Tooltip target={`#${componentIds.userChecked}`} content={`Pending Checker`} />
              </UserSearchIcon>
            )
          }
        </div>
      </div>
    )
  }

  return (
    <Card subTitle={subTitle} className="mx-2 my-1">
      <div className="flex flex-row items-center justify-between">
        <InputText value={value} onChange={e => setValue(e.target.value)} className="p-inputtext-sm" disabled={f.status !== CaseFieldStatus.Pending}/>
        <div className='flex flex-row'>
          <InfoIcon id={componentIds.fieldInfo} size={iconSize} className={iconClassClickable} onClick={props.onMoreInfo}>
            <Tooltip target={`#${componentIds.fieldInfo}`} content="View Documents" />
          </InfoIcon>
          <CheckCircle2Icon id={componentIds.fieldApprove} size={iconSize} className={iconClassClickable} onClick={e => setStatus(CaseFieldStatus.Approved)}>
            <Tooltip target={`#${componentIds.fieldApprove}`} content="Approve" />
          </CheckCircle2Icon>
          {/* <XCircleIcon id={componentIds.fieldReject} size={iconSize} className={iconClassClickable} onClick={e => setStatus(CaseFieldStatus.Rejected)}>
            <Tooltip target={`#${componentIds.fieldReject}`} content="Reject" />
          </XCircleIcon> */}
        </div>
      </div>
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