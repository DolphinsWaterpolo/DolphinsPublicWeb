require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/content_for'

get '/' do
	erb :index
#  send_file File.expand_path('index.htm', settings.public_folder)
end

get '/committee' do
	erb :committee
end

get '/sponsors' do
	erb :sponsors
end

get '/search' do
	erb :search
end

get '/details' do
	erb :details
end