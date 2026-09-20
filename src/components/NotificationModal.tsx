import React from 'react';
import { X, Bell, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationModal: React.FC = () => {
  const {
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setActiveTab,
    setSelectedCropId,
    t
  } = useApp();

  if (!isNotificationModalOpen) return null;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.cropId) {
      setSelectedCropId(notif.cropId);
    }
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    setIsNotificationModalOpen(false);
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'price_alert':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'harvest_reminder':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'monthly_report':
        return <DollarSign className="w-4 h-4 text-blue-600" />;
      case 'cost_warning':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-emerald-900 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base leading-tight">{t.notifications}</h3>
              <p className="text-[11px] text-emerald-200">Live farming updates & alerts</p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-emerald-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 flex justify-between items-center text-xs">
          <span className="font-bold text-emerald-900">
            {notifications.filter(n => !n.isRead).length} New Alerts
          </span>
          <button
            onClick={markAllNotificationsRead}
            className="text-emerald-700 hover:text-emerald-900 font-semibold transition"
          >
            {t.markAllRead}
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-gray-100">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`pt-2.5 first:pt-0 p-3 rounded-2xl transition cursor-pointer flex gap-3 items-start ${
                notif.isRead
                  ? 'bg-white hover:bg-gray-50 opacity-80'
                  : 'bg-emerald-50/50 hover:bg-emerald-100/50 border border-emerald-200/60 shadow-xs'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                {getNotifIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className={`text-xs font-bold ${notif.isRead ? 'text-gray-700' : 'text-slate-900'}`}>
                    {notif.defaultTitle}
                  </h4>
                  <span className="text-[10px] text-gray-400 shrink-0">{notif.timeAgo}</span>
                </div>
                <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                  {notif.defaultDesc}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline">
                  <span>Take action</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
