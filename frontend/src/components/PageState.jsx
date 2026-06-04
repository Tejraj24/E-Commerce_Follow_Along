import { motion } from 'framer-motion';
import { FiAlertCircle, FiInbox, FiLoader } from 'react-icons/fi';

export function LoadingState({ title = 'Loading', subtitle = 'Please wait a moment while we fetch the latest content.' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[55vh] w-full items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-xl rounded-[1.75rem] border border-gray-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-white">
          <FiLoader className="h-6 w-6 animate-spin" />
        </div>
        <h2 className="lux-heading text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export function ErrorState({ title = 'Something went wrong', message = 'We could not load this section right now.', actionLabel = 'Retry', onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[55vh] w-full items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-xl rounded-[1.75rem] border border-red-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(127,29,29,0.08)] sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <FiAlertCircle className="h-6 w-6" />
        </div>
        <h2 className="lux-heading text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">{message}</p>
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function EmptyState({ title = 'Nothing here yet', message = 'This section is currently empty.', actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[55vh] w-full items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-xl rounded-[1.75rem] border border-gray-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-900">
          <FiInbox className="h-6 w-6" />
        </div>
        <h2 className="lux-heading text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">{message}</p>
        {onAction && actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-transform hover:-translate-y-0.5 hover:bg-gray-900 hover:text-white"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
