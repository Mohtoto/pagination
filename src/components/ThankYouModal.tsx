import React from 'react'

const ThankyYouModal = ({ setThankModal }: { setThankModal: (val: boolean) => void }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 transition-all">
            <div className='bg-white p-4 rounded-md flex gap-2 items-center'>
                <button className='bg-zinc-800 py-2 px-4 rounded-sm text-white cursor-pointer' onClick={() => setThankModal(true)}>OK</button>
                <p className='font-semibold'>Thank you for applying</p>
            </div>
        </div>
    )
}

export default ThankyYouModal