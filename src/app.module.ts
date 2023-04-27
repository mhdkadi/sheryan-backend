import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrafficLightsModule } from './traffic_lights/traffic_lights.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TrafficLightsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sheryan:sheryan@sheryan.piccwzz.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
