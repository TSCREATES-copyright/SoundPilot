function RuleAlert({ messages = [] }) {
  const iconByType = {
    suggestion: '💡',
    insight: '🔥',
    warning: '⚠️'
  }

  if (!messages.length) return null

  return (
    <div className="space-y-2">
      {messages.map((item, idx) => (
        <div key={`${item.message}-${idx}`} className="panel p-3 text-sm transition hover:bg-[#1f1f1f]">
          <span className="mr-2">{iconByType[item.type] || '💡'}</span>
          <span>{item.message}</span>
        </div>
      ))}
    </div>
  )
}

export default RuleAlert
