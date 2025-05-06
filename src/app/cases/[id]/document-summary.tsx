import { FieldDocumentResult } from '@/models/case';
import { BadgeAlertIcon, BadgeCheckIcon, BadgeXIcon, ClockIcon, EyeIcon, FileIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { Tooltip } from 'primereact/tooltip';
import { Accordion, AccordionTab } from 'primereact/accordion';

type DocumentSummaryProps = {
  value: FieldDocumentResult[],
  index?: number,
  onMoreInfo: (e: any) => void,
}

export default function DocumentSummary(props: DocumentSummaryProps) {
  const docs = props.value;

  // const [value, setValue] = useState(f.value);

  const iconSize = "1.5rem";
  const iconClass = "icon m-2";
  const iconClassClickable = "icon action m-1 cursor-pointer";

  const componentIds = {
    isRefInfo: `document-ref-info-${props.index}`,
    fieldInfo: `document-info-${props.index}`,
    confidenceMark: `document-confidence-${props.index}`,
  }

  const subTitle = (f: FieldDocumentResult) => {
    return (
      <div className="horizontal justify-between">
        {/* <div className='flex flex-row'>
          <div >
            {props.index?.toString()}
          </div>
          {f.name}
        </div> */}
        {f.type}
        <div className="horizontal">
          {
            f.isRef ? (
              <SettingsIcon id={componentIds.isRefInfo} size={iconSize} className={`${iconClass} text-gray-400`}>
                <Tooltip target={`#${componentIds.isRefInfo}`} content="Reference Value" />
              </SettingsIcon>
            ) : null
          }
          {
            f.confidence > 0.8 ? (
              <BadgeCheckIcon id={componentIds.confidenceMark} size={iconSize} className={`icon m-1 text-green-500`}>
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Great confidence`} />
              </BadgeCheckIcon>
            ) : (f.confidence === 0 ?
              <BadgeXIcon id={componentIds.confidenceMark} size={iconSize} className={`icon m-1 text-red-300`}>
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Potential conflict`} />
              </BadgeXIcon> :
              <BadgeAlertIcon id={componentIds.confidenceMark} size={iconSize} className={`icon m-1 text-yellow-300`} >
                <Tooltip target={`#${componentIds.confidenceMark}`} content={`Lower confidence`} />
              </BadgeAlertIcon>)
          }
        </div>
      </div>
    )
  }

  return (
    <Accordion multiple>
      {
        docs.map((d, i) => (
          <AccordionTab key={`${d.name}-${i}`} header={subTitle(d)}>
            <div className="horizontal">
              <PencilIcon size={iconSize} className={`${iconClass} text-gray-400`} />
              <p className="text-sm">{d.value}</p>
            </div>
            <div className="horizontal cursor-pointer" onClick={e => props.onMoreInfo(d)}>
              <FileIcon size={iconSize} className={`${iconClass} text-gray-400`} />
              <p className="text-sm text-blue-500">{d.name}</p>
            </div>
          </AccordionTab>
        ))
      }
    </Accordion>
  )

  // return (
  //   <Card subTitle={subTitle} className="mx-2 my-1">
  //     <div className="flex flex-row items-center justify-between">
  //       <div>
  //         <div className="horizontal">
  //           <PencilIcon size={iconSize} className={`${iconClass} text-gray-400`} />
  //           <p className="text-sm">{f.value}</p>
  //         </div>
  //         <div className="horizontal">
  //           <FileIcon size={iconSize} className={`${iconClass} text-gray-400`} />
  //           <p className="text-sm">{f.name}</p>
  //         </div>
  //         <div className="horizontal">
  //           <ClockIcon size={iconSize} className={`${iconClass} text-gray-400`} />
  //           <p className="text-sm">{format(f.createdAt, "yyyy-MM-dd")}</p>
  //         </div>
  //       </div>
  //       <div className='flex flex-row'>
  //         <EyeIcon id={componentIds.fieldInfo} size={iconSize} className={iconClassClickable} onClick={props.onMoreInfo}>
  //           <Tooltip target={`#${componentIds.fieldInfo}`} content="Check Document" />
  //         </EyeIcon>
  //       </div>
  //     </div>
  //   </Card>
  //   // <div className="field-summary grid grid-cols-3 items-center" key={f.name}>
  //   //   <div className="col-span-1 flex flex-col">
  //   //     <p className="text-sm">{f.name}</p>
  //   //   </div>
  //   //   <div className="col-span-1 flex flex-col gap-2">

  //   //   </div>
  //   //   <div className="col-span-1 flex flex-col">

  //   //   </div>
  //   // </div>
  // )
}