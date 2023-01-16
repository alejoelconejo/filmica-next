import Head from 'next/head'

interface Props {
  title: string
  description: string
}

export function HeadCustom({ title, description }: Props) {
  return (
    <Head>
      <title key='title'>{title}</title>
      <meta name='description' content={description} key='description' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
