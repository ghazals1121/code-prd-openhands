module Api
  module V1
    class RoomsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:index, :show]
      def index
        rooms = Room.available
        rooms = rooms.where(room_type: params[:room_type]) if params[:room_type]
        rooms = rooms.where("capacity >= ?", params[:min_capacity]) if params[:min_capacity]
        render json: rooms, each_serializer: RoomSerializer
      end
      def show
        render json: Room.find(params[:id]), serializer: RoomSerializer
      end
    end
  end
end
