module DatetimeHelper
  def format_duration(duration)
    return '' if duration.blank?

    hours = duration / 1.hour
    minutes = (duration - hours.hours) / 1.minute

    if hours.positive?
      "#{hours}h #{minutes}m"
    else
      "#{minutes}m"
    end
  end
end
