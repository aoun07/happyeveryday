'use client';

import { usePathname, useRouter } from 'next/navigation';
import './styles/RegionModeTabs.css';

export default function RegionModeTabs() {
    const pathname = usePathname();
    const router = useRouter();

    const isTH = pathname.startsWith('/checkpriceth');
    const isUS = pathname.startsWith('/checkpriceus');



    return (
        <div className="happy-mode-tabs" role="tablist" aria-label="โหมดคำนวณ">
        <button
            type="button"
            role="tab"
            aria-selected={isTH}
            className={`happy-mode-tab ${isTH ? 'is-active' : ''}`}
            onClick={() => router.push('/checkpriceth')}
        >
            <img
            src="/th-flag.png"
            alt="TH"
            className="happy-mode-icon"
            style={{ width: '15px', float: 'left' }}
            />
            <span style={{ paddingLeft: '5px' }}>TH</span>
        </button>

        <button
            type="button"
            role="tab"
            aria-selected={isUS}
            className={`happy-mode-tab ${isUS ? 'is-active' : ''}`}
            onClick={() => router.push('/checkpriceus')}
        >
            <img
            src="/us-flag.png"
            alt="US"
            className="happy-mode-icon"
            style={{ width: '15px', float: 'left' }}
            />
            <span style={{ paddingLeft: '2px' }}>US</span>
        </button>
        </div>
    );
}