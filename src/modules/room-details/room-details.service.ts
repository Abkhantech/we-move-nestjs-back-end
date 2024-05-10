import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { RoomDetails } from "./room-details.entity";
import { Repository } from "typeorm";
import { MoveRequest } from "../move-request/move-request.entity";
import { MovingItem } from "../move-request/moving-item/moving-item.entity";
import { CreateRoomDetailsDto } from "./dto/create-room-details.dto";

Injectable();
export class RoomDetailsService {
  constructor(
    @InjectRepository(RoomDetails)
    private roomDetailsRepository: Repository<RoomDetails>,
    @InjectRepository(MoveRequest)
    private moveRequestRepository: Repository<MoveRequest>,
    @InjectRepository(MovingItem)
    private movingItemRepository: Repository<MovingItem>
  ) {}

  async saveRoomVideoToS3(
    body: CreateRoomDetailsDto
  ): Promise<any> {
    const moveRequest = await this.moveRequestRepository.findOne({
      where: {
        id: body.moveRequestId,
      },
    });
    if (moveRequest) {
      const room_details = await this.roomDetailsRepository.save(
        this.roomDetailsRepository.create({
          video_url: body.video_url,
          title: body.title,
          moveRequest: moveRequest,
        })
      );
      console.log(moveRequest.total_cubic_feet, "TOTAL CURRENT------>>>>>");
      console.log(room_details, "--ROOM DETAILS");
      if (room_details) {
        // const formData = new FormData();
        // formData.append("s3_url", file);
        let modified_video_url = body.video_url.replace("https", "s3");
        modified_video_url = modified_video_url.replace(
          ".s3.amazonaws.com",
          ""
        );
        console.log(modified_video_url);
        // const url = `http://54.226.226.123/download_s3_file?s3_url`;
        const url = `http://54.226.0.162/download_s3_file?s3_url`;
        try {
          const response: any = await Promise.race([
            axios({
              method: "get",
              url: url,
              params: {
                s3_url: modified_video_url,
              },
              // headers: {
              //   "Content-Type": "multipart/form-data",
              // },
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), 600000)
            ), // Timeout after 10 minutes
          ]);
          console.log(response.data, "-RESPONSE->>>");
          const itemsArray = JSON.parse(response.data);
          if (itemsArray.length) {
            let inventoryArray;
            let total_cubic_feet;
            itemsArray.map(async (item: any) => {
              console.log(item);
              for (let i = 0; i < item.count; i++) {
                // console.log(item.object_type_name);

                if (item.count > 1) {
                  let index = i + 1;
                  let thisItemName =
                    item.object_type_name.toString() + "-" + index.toString();
                  await this.movingItemRepository.save(
                    this.movingItemRepository.create({
                      item_name: thisItemName,
                      item_width: item.predicted_dimensions[0],
                      item_length: item.predicted_dimensions[1],
                      item_height: item.predicted_dimensions[2],
                      roomDetails: room_details,
                    })
                  );
                  // let cubic_feet;
                  // cubic_feet = Number(item.predicted_dimensions[0])*Number(item.predicted_dimensions[1])*Number(item.predicted_dimensions[2])
                  // // console.log('CUBIC FEET-->',cubic_feet)
                  // moveRequest.total_cubic_feet+=Math.round(cubic_feet)
                  // await this.moveRequestRepository.save(moveRequest)

                  // const itemObject = {
                  //   item_name: thisItemName,
                  //   item_width: item.predicted_dimensions[0],
                  //   item_length: item.predicted_dimensions[1],
                  //   item_height: item.predicted_dimensions[2]
                  // }
                  // inventoryArray.push(itemObject)
                  // setInventoryItems((prevItems:any)=> [...prevItems, itemObject])
                } else {
                  await this.movingItemRepository.save(
                    this.movingItemRepository.create({
                      item_name: item.object_type_name,
                      item_width: item.predicted_dimensions[0],
                      item_length: item.predicted_dimensions[1],
                      item_height: item.predicted_dimensions[2],
                      roomDetails: room_details,
                    })
                  );
                  // let cubic_feet;
                  // cubic_feet = Number(item.predicted_dimensions[0])*Number(item.predicted_dimensions[1])*Number(item.predicted_dimensions[2])
                  // // console.log('CUBIC FEET-->',cubic_feet)

                  // moveRequest.total_cubic_feet+=Math.round(cubic_feet)
                  // await this.moveRequestRepository.save(moveRequest)

                  // const itemObject = {
                  //   item_name: item.object_type_name,
                  //   item_width: item.predicted_dimensions[0],
                  //   item_length: item.predicted_dimensions[1],
                  //   item_height: item.predicted_dimensions[2]
                  // }
                  // inventoryArray.push(itemObject)
                  // setInventoryItems((prevItems:any)=> [...prevItems, itemObject])
                }
              }
            });
          }
          // alert("Video uploaded successfully.");
          return true;
          // setInventoryResponse((prevInventory:any)=>[...prevInventory, response])
        } catch (error) {
          console.error("Error uploading video:", error);
          // alert("Failed to upload video.");
        }
      }
      return room_details;
    }
  }

  async updateRoomDetails(
    currentMovingItems: CreateRoomDetailsDto
  ): Promise<any> {
    try {
      let roomDetails = await this.roomDetailsRepository.findOne({
        where: {
          id: currentMovingItems.roomDetailId,
        },
        relations: ["items"],
      });

      console.log("room details before>>>>>>>>", roomDetails);

      if (roomDetails && roomDetails.items.length > 0) {
        await Promise.all(
          roomDetails.items.map(async (item) => {
            await this.movingItemRepository.delete(item.id);
          })
        );
      }

      //  roomDetails = await this.roomDetailsRepository.findOne({
      //   where: {
      //     id: currentMovingItems.roomDetailId,
      //   },
      //   relations:['items']
      // });

      console.log("room details after>>>>>>>>", roomDetails);
      let total_cubic_feet = 0.0;
      await Promise.all(
        currentMovingItems.items.map(async (item) => {
          console.log(item, "--");
          await this.movingItemRepository.save(
            this.movingItemRepository.create({
              item_name: item.item_name,
              item_width: item.item_width,
              item_length: item.item_length,
              item_height: item.item_height,
              roomDetails: roomDetails,
            })
          );
          const cubic_feet =
            Number(item.item_width) *
            Number(item.item_length) *
            Number(item.item_height);
          total_cubic_feet = total_cubic_feet + cubic_feet;
          const updatedRoomDetails = await this.roomDetailsRepository.findOne({
            where: {
              id: currentMovingItems.roomDetailId,
            },
          });
          updatedRoomDetails.room_cubic_feet = Math.ceil(total_cubic_feet);
          await this.roomDetailsRepository.save(updatedRoomDetails);
          // const move_request = await this.moveRequestRepository.findOne({
          //   where:{
          //     roomDetails:{
          //       id: currentMovingItems.roomDetailId
          //     }
          //   }
          // })
          // if(move_request){
          //   move_request.total_cubic_feet = total_cubic_feet;
          //   await this.moveRequestRepository.save(move_request)
          //   console.log(move_request)
          // }
        })
      );
      console.log(total_cubic_feet, "---->>TOTAL");

      return true;
    } catch (error) {
      console.error("Error Updating Moving Items:", error);
    }
  }
  async calculateTotalCubicFeet(moveRequestId: string): Promise<any> {
    const move_request = await this.moveRequestRepository.findOne({
      where: {
        canonical_id: moveRequestId,
      },
      relations: [
        "roomDetails",
        "storage",
        "combo_home_storage",
        "combo_home_storage.storage",
        "combo_apartment_storage",
        "combo_apartment_storage.storage",
      ],
    });
    move_request.total_cubic_feet = 0;
    await this.moveRequestRepository.save(move_request);
    if (move_request && move_request.roomDetails) {
      move_request.roomDetails.map(async (room: RoomDetails) => {
        move_request.total_cubic_feet =
          Number(move_request.total_cubic_feet) + Number(room.room_cubic_feet);
        await this.moveRequestRepository.save(move_request);
      });
    }
    if(move_request.storage!==null){
      console.log('storage not null');
      move_request.total_cubic_feet = Number(move_request.total_cubic_feet) + Number(move_request.storage.storage_cubic_feet);
      await this.moveRequestRepository.save(move_request)
    }

    if(move_request.combo_apartment_storage!==null){
      console.log('combo apartment storage not null');
      move_request.total_cubic_feet = Number(move_request.total_cubic_feet) + Number(move_request.combo_apartment_storage.storage.storage_cubic_feet);
      await this.moveRequestRepository.save(move_request)
    }

    if(move_request.combo_home_storage!==null){
      console.log('combo home storage not null');
      move_request.total_cubic_feet = Number(move_request.total_cubic_feet) + Number(move_request.combo_home_storage.storage.storage_cubic_feet);
      await this.moveRequestRepository.save(move_request)
    }

    if(Number(move_request.total_cubic_feet)<300){
      move_request.total_cubic_feet = 300;
      await this.moveRequestRepository.save(move_request);
    }
    return move_request;
  }
}
