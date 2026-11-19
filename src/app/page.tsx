import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="happyContainer">
      <img
        className="logo"
        src="/logored.png"
        alt="Happy Everyday"
        style={{
          display: 'block',
          margin: '0 auto 12px auto',
        }}
      />

      

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/checkprice"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '180px',
            padding: '14px 24px',
            borderRadius: '10px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.22)',
          }}
        >
          Check Price
        </Link>

        <Link
          href="/order"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '180px',
            padding: '14px 24px',
            borderRadius: '10px',
            backgroundColor: '#059669',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 10px rgba(5, 150, 105, 0.22)',
          }}
        >
          Order
        </Link>
      </div>
    </div>
  );
}