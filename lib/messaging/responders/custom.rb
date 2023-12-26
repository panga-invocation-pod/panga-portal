module Messaging
  module Responders
    class Custom
      def self.from_data(data)
        new data['name']
      end

      def initialize(name)
        @name = name
      end

      attr_reader :name

      def as_json(context)
        {
          responder_type: 'custom',
          name: name,
          custom_data: context.custom_responder(name).as_json
        }
      end
    end
  end
end