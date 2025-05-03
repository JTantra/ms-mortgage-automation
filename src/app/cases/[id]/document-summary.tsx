import { CaseFieldStatus, FieldDocumentResult } from '@/models/case';
import { BadgeAlertIcon, BadgeCheckIcon, CheckCircle2Icon, ClockIcon, EyeIcon, FileIcon, InfoIcon, PencilIcon, UserCheckIcon, UserSearchIcon, UserXIcon, XCircleIcon } from 'lucide-react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { useState } from 'react';
import { format } from 'date-fns';

type DocumentSummaryProps = {
  value: FieldDocumentResult,
  index?: number,
  onMoreInfo?: (e: any) => void,
}

export default function DocumentSummary(props: DocumentSummaryProps) {
  const f = props.value;

  const [value, setValue] = useState(f.value);

  const iconSize = "1.5rem";
  const iconClass = "icon m-2";
  const iconClassClickable = "icon action m-1 cursor-pointer";

  const componentIds = {
    fieldInfo: `document-info-${props.index}`,
    confidenceMark: `document-confidence-${props.index}`,
  }

  const subTitle = () => {
    return (
      <div className="flex flex-row items-center justify-between">
        {/* <div className='flex flex-row'>
          <div >
            {props.index?.toString()}
          </div>
          {f.name}
        </div> */}
        {f.type}
        <div className="flex flex-row">
          {
            f.confidence > 0.8 ? (
              <BadgeCheckIcon id={componentIds.confidenceMark} size={iconSize} className={`icon m-1 text-green-500`}>
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Great confidence`} />
              </BadgeCheckIcon>
            ) : (
              <BadgeAlertIcon id={componentIds.confidenceMark} size={iconSize} className={`icon m-1 text-yellow-300`} >
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Lower confidence`} />
              </BadgeAlertIcon>
            )
          }
        </div>
      </div>
    )
  }

  return (
    <Card subTitle={subTitle} className="mx-2 my-1">
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="horizontal">
            <PencilIcon size={iconSize} className={`${iconClass} text-gray-400`} />
            <p className="text-sm">{f.value}</p>
          </div>
          <div className="horizontal">
            <FileIcon size={iconSize} className={`${iconClass} text-gray-400`} />
            <p className="text-sm">{f.name}</p>
          </div>
          <div className="horizontal">
            <ClockIcon size={iconSize} className={`${iconClass} text-gray-400`} />
            <p className="text-sm">{format(f.createdAt, "yyyy-MM-dd")}</p>
          </div>
        </div>
        <div className='flex flex-row'>
          <EyeIcon id={componentIds.fieldInfo} size={iconSize} className={iconClassClickable} onClick={props.onMoreInfo}>
            <Tooltip target={`#${componentIds.fieldInfo}`} content="Check Document" />
          </EyeIcon>
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