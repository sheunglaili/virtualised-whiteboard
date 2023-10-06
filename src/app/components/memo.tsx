type MemoProps = {
    bgColour: string
}

export function Memo({ bgColour }: MemoProps) {

    return (
        <div 
            className={`drop-shadow-md rounded`} 
            style={{
                height: 80,
                width: 80,
                backgroundColor: bgColour
            }}
        />
    )
}