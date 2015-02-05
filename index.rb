require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/content_for'

set :show_exceptions, false

get '/' do
	erb :index
#  send_file File.expand_path('index.htm', settings.public_folder)
end
#Home
get '/about' do
	erb :about
end

get '/flippaball' do
	erb :flippaball
end

get '/committee' do
	erb :committee
end

get '/involved' do
	erb :involved
end

get '/contact' do
	erb :contact
end

# ----
get '/training' do
	erb :training
end

get '/events' do
	erb :events
end

get '/join' do
	erb :join
end

get '/merchandise' do
	erb :merchandise
end

# ---
get '/sponsors' do
	erb :sponsors
end

get '/search' do
	erb :search
end

get '/details' do
	erb :details
end

not_found do
  'Umm, looks like a stray pass...'
end

error do
  'Arrrrggghhhh... dont pass it to the lefty!'
end