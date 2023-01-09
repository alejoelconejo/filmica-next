interface Props {
  title: string
}

export function DetailTitle({ title }: Props) {
  return <h2 className='text-4xl font-semibold'>{title}</h2>
}
