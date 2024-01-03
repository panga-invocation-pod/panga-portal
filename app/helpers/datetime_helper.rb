module DatetimeHelper
  def format_time_range(start_at, end_at)
    if end_at.present?
      "#{format_time(start_at)} - #{format_time(end_at)}"
    else
      format_time(start_at)
    end
  end

  def format_time(time)
    if time.min.zero?
      return time.strftime('%-l%p').downcase
    end
    time.strftime('%-l:%M%p').downcase
  end

  def format_date(date)
    result = date.strftime('%a, %-d %b')
    if date.year != Time.zone.now.year
      result += ", #{date.year}"
    end
    result
  end

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
