'use client';
import * as React from 'react';
import { useMDXComponent } from 'next-contentlayer2/hooks';

type MDXProps = { code: string };

export function MDXClient({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  return <Component />;
}
