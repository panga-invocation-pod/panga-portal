module Messaging
  module Responders
    class BaseResponder
      def self.from_data(data)
        new data
      end

      def initialize(data)
        @data = data
      end

      def as_json(context = nil)
        data
      end
    end
  end
end
