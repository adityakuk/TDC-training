import Image from 'next/image'
import React from 'react'

const HeaderBanner = () => {
    return (

        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <Image
                alt="Mountains"
                src="/photos/paan-2.webp"
                sizes="100vw"
                width={0}
                height={0}
                style={{
                    width: '100%',
                    height: 'auto',
                }}

            />
        </div>
    )
}

export default HeaderBanner
