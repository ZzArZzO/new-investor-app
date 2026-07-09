"use client";

import { BROKERS, COMPARE_LAST_CHECKED, CRYPTO_EXCHANGES } from "@/content/brokers";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trackEvent } from "@/lib/analytics";

export default function ComparePage() {
  return (
    <div className="pt-1">
      <h2 className="font-heading text-xl font-medium">Tools &amp; platforms</h2>
      <p className="mt-1.5 text-[15px] text-muted-foreground">The landscape, shown to everyone. Facts only. We don&rsquo;t tell you what to buy.</p>

      <div className="mt-3 rounded-lg border border-dashed border-border bg-card px-3 py-2.5 text-[12px] text-muted-foreground">
        Some links may be affiliate links: we could earn a fee if you open an account through them, at no cost to you. This
        never changes what&rsquo;s listed or the order.
      </div>

      <div className="mt-2 text-[12px] font-semibold text-muted-foreground">Data last verified: {COMPARE_LAST_CHECKED}</div>

      <div className="mt-4.5 mb-2 text-xs font-bold uppercase tracking-wide text-primary">Investing · brokers &amp; robo-advisors</div>
      <div className="rounded-2xl bg-card p-3 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Regulation</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Minimum</TableHead>
              <TableHead>Notable</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BROKERS.map((b) => (
              <TableRow key={b.name}>
                <TableCell className="font-bold">{b.name}</TableCell>
                <TableCell>{b.type}</TableCell>
                <TableCell>{b.regulation}</TableCell>
                <TableCell>{b.cost}</TableCell>
                <TableCell>{b.minimum}</TableCell>
                <TableCell>{b.notable}</TableCell>
                <TableCell>
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("broker_link_clicked", { provider: b.name })}
                    className="font-semibold text-accent-foreground underline"
                  >
                    Visit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4.5 mb-2 text-xs font-bold uppercase tracking-wide text-primary">Crypto · MiCA-licensed exchanges only</div>
      <div className="mb-3 rounded-lg bg-amber-soft px-3.5 py-3 text-[14px] font-semibold">
        ⚠️ Crypto is high-risk: prices are very volatile and you can lose everything. There&rsquo;s generally no
        investor-compensation scheme. Only ever use MiCA-licensed platforms.
      </div>
      <div className="rounded-2xl bg-card p-3 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exchange</TableHead>
              <TableHead>CASP licence</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Notable</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CRYPTO_EXCHANGES.map((c) => (
              <TableRow
                key={c.name}
                onClick={() => trackEvent("exchange_link_clicked", { provider: c.name })}
                className="cursor-pointer"
              >
                <TableCell className="font-bold">{c.name}</TableCell>
                <TableCell>{c.licence}</TableCell>
                <TableCell>{c.cost}</TableCell>
                <TableCell>{c.notable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-3 text-[12px] text-muted-foreground">
        Every figure here is illustrative and must be verified against each provider&rsquo;s current pricing before real use.
        Exchanges shown are examples reported as MiCA-licensed and should be re-checked on the ESMA CASP register.
      </p>

      <p className="mt-6 px-1 pb-2 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest. Crypto is high-risk and can go to zero.
      </p>
    </div>
  );
}
