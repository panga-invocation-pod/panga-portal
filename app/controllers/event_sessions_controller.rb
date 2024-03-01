require 'icalendar'
require 'icalendar/tzinfo'

class EventSessionsController < ApplicationController
  def show
    @session = EventSession.find(params[:id])

    cal = Icalendar::Calendar.new
    cal.add_timezone build_timezone

    cal.event do |e|
      e.uid         = "#{@session.id}@#{Rails.application.config.action_mailer.default_url_options[:host]}"
      e.dtstart     = build_datetime @session.start_at
      e.dtend       = build_datetime @session.end_at
      e.summary     = @session.event.name
      e.location    = @session.location.address.to_s
    end

    cal.publish

    render plain: cal.to_ical, content_type: 'text/calendar'
  end

  private

  def tzid
    'Australia/Melbourne'
  end

  def build_timezone
    tz = TZInfo::Timezone.get tzid
    tz.ical_timezone Time.current
  end

  def build_datetime(input)
    Icalendar::Values::DateTime.new input, 'tzid' => tzid
  end
end
