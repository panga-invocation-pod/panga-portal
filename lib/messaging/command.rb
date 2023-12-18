module Messaging
  class Command
    def self.from_data(data)
      return nil if data.nil?
      data = {"name" => data} if data.is_a?(String)

      name = data['name']

      self.new(name: name)
    end

    def initialize(name:)
      @name = name
    end

    attr_reader :name
  end
end
